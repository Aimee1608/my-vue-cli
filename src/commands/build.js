import webpack from 'webpack'
import chalk from 'chalk'
import getConfig from '../../webpack/config'
import { getText } from '../utils/utils'
import { getComponentInfo, modifyFile } from '../utils'
import { runBuildTasks } from './buildlib'
import { clean } from '../utils/clean'

function build(componentType, componentName) {
	const config = getConfig(componentType, componentName)
	config.mode = 'production'
	return new Promise((resolve, reject) => {
		webpack(config, (err, stats) => {
			if (err) {
				return reject(err);
			}
			const { errors, assets } = stats.compilation;
			if (errors.length > 0) {
				errors.forEach((err2) => {
					reject(err2);
				});
				return;
			}
			resolve(assets)
		})
	})
}
async function buildAction(config) {
	await clean()
	await runBuildTasks()
	const componentInfo = await getComponentInfo()
	// console.log('componentInfo', componentInfo)
	await modifyFile('package.json', { 'main': 'lib/install.js' })
	if (config.link === 'links') {
		return;
	}
	// return
	// 不发npm包没必要更改版本号
	if (config.type !== 'only') {
		// 手动输入版本号更改package.json文件里的version
		const version = await getText(`请输入组件库版本号(当前版本${componentInfo.version}): `)
		await modifyFile('package.json', { 'version': version })
		componentInfo.version = version
	}
	const assets = await build(componentInfo.type, componentInfo.name)
	console.log(chalk.green(`项目构建完成`))
}
export default buildAction
