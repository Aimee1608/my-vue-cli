import path from 'path'
import fs from 'fs-extra'
import ora from 'ora'
import shelljs from 'shelljs'// 系统命令行交互
import chalk from 'chalk'
import str from 'underscore.string'
import { getPackageJsonConfig } from '../utils'
import { getText, confirm } from '../utils/utils'
import renderDir from '../utils/render'
import { PROJECT_TEMPLATE_PATH_CONFIG, GIT_BASE_URL, COMMON_TEMPLATE_DIR } from '../common/constant'

async function getWidgetDir(targetPath) {
  const projectDir = process.cwd(); // Node.js 进程的当前工作目录
  const parsedTargetPath = path.parse(targetPath)
  const aValidNameFromPath = !['', '.'].includes(parsedTargetPath.base)
  const baseName = aValidNameFromPath ? parsedTargetPath.base : await getText('输入项目名称: ( 如: testComponent, 小驼峰 )');
  const componentName = str(baseName)
    .trim()
    .classify()
    .underscored()
    .value();
  const result = /^[a-z_]*$/g.test(componentName)
  if (!result) {
    console.log(`Please enter a valid component name!`)
    return
  }
  parsedTargetPath.base = componentName
  targetPath = path.format(parsedTargetPath)
  // 目标路径
  return {
    widgetDir: targetPath
      ? (path.isAbsolute(targetPath) ? targetPath : path.resolve(projectDir, targetPath))
      : path.join(projectDir, componentName),
    componentName
  }
}

async function initAction(targetPath = '') {
  try {
    // 判断用户创建的项目在远端是否存在
    // console.log('path', targetPath)

    let result = { accessToken: '', userInfo: { name: 'aimee' } }

    let userInfo = result?.userInfo

    const { widgetDir, componentName } = await getWidgetDir(targetPath) || {}
    if (!componentName) return
    // 同名文件检测
    const pathIsExists = await fs.pathExists(widgetDir)
    pathIsExists && !await confirm('同名文件已存在，是否覆盖？') && shelljs.exit(1)

    const packageJsonConfig = await getPackageJsonConfig({ componentName })
    if (!packageJsonConfig) return // 用户未确认创建

    const initLoading = ora('项目模板初始化...').start();
    pathIsExists && await fs.remove(widgetDir) // 用户确认创建后移除已经存在的文件
    await fs.copy(COMMON_TEMPLATE_DIR + '/package.json', widgetDir + '/package.json')
    await fs.copy(COMMON_TEMPLATE_DIR + '/.gitignoreTemplate', widgetDir + '/.gitignore')
    await fs.copy(PROJECT_TEMPLATE_PATH_CONFIG[packageJsonConfig.componentType], widgetDir)


    // 渲染模板
    await renderDir(widgetDir, {
      name: componentName,
      componentName: str(targetPath || componentName).capitalize().value(), // 驼峰格式：ComponentName
      description: packageJsonConfig.description,
      componentType: packageJsonConfig.componentType,
      author: userInfo.name,
      gitUrl: `${GIT_BASE_URL}/${componentName}.git`
    })
    initLoading.succeed(chalk.green('项目模板初始化完成'));
    console.log(chalk.blue(`\ncd ${componentName}`))
    console.log(chalk.blue('my-vue-cli dev'))
    console.log(chalk.red('my-vue-cli 图片只支持url'))
  } catch (e) {
    console.log(e)
  }
}
export default initAction

