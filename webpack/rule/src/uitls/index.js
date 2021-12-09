export function getRuleData(rule) {
  const { data, config } = rule;
  let newData = {}
  for (var key in config) {
    newData[key] = data[key] === undefined ? getDefaultDataByType(newData[key].type) : data[key]
  }
  return newData;
}

export function getDefaultDataByType(type) {
  if (type === 'NormalText') {
    return ''
  }
  return null
}

export function getRuleConfig(rule) {
  const { config } = rule;
  // const newData = getRuleData(rule);
  // const list = Object.keys(config).map(item => {
  //   return { key: item, control: config[item], value: newData[item] }
  // })
  return config;
}

export function initRule(rule) {
  const { data, config } = rule;
  let newData = {};
  // for (var key in data) {
  //   newData = 
  // }
}