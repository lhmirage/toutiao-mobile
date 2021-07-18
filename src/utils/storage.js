// 本地存储封装
export const getItem = () => {
  const data = window.localStorage.getItem(name)
  try {
    return JSON.parse(data) // 尝试把data转为js对象
  } catch (err) {
    // data不是JSON格式字符串
    return data
  }
}

export const setItem = (name, value) => {
  // value是对象，先转
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}

export const removeItem = name => {
  window.localStorage.setItem(name)
}
