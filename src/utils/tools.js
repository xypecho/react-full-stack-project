/*
 * @Author: xueyp
 * @Date: 2019-11-13 17:11:10
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-22 14:40:06
 * @description: 一些工具
 */
export default class Tools {
    // 格式化‘15天内新增注册用户的图表’接口返回的数据,
    // 预期的数据格式为  [{ name: '2018-05-22', count: 32371 },{ name: '2018-05-23', count: 12328 }]
    formatterChartsData(data) {
        const tempArr = [];
        const arr = [];
        // 获取15天内所有的时间
        const now = new Date().getTime();
        const fifteenDayAgo = now - (15 * 24 * 60 * 60 * 1000);
        const oneDay = 1000 * 60 * 60 * 24;
        for (let i = fifteenDayAgo; i <= now; i += oneDay) {
            tempArr.push({ name: `${new Date(i).getFullYear()}-${new Date(i).getMonth() + 1}-${new Date(i).getDate()}`, count: 0 })
        }
        if (data.length === 0) {
            return tempArr;
        } else {
            data.forEach(ele => arr.push(new Date(ele.register_time).toDateString()));
            tempArr.forEach((item, key) => {
                arr.forEach((value, index) => {
                    if (new Date(item.name).toDateString() === new Date(value).toDateString()) {
                        item.count += 1;
                    }
                })
            })
            return tempArr;
        }
    }

    // 找到嵌套数组对象的层级关系，menus为数组对象，pathname为需要找到的值
    findSubMenu = (menus, pathname) => {
        const arr = [];
        const loop = (menus) => {
            return menus.some(item => {
                if (item.key === pathname) {
                    arr.unshift({ key: item.key, title: item.title, hidden: item.hidden })
                    return true
                } else {
                    if (item.subs) {
                        let hasSamePathname = loop(item.subs, pathname);
                        if (hasSamePathname) {
                            arr.unshift({ key: item.key, title: item.title, hidden: item.hidden })
                        }
                        return hasSamePathname;
                    }
                }
            })
        }
        loop(menus);
        return arr;
    }
}
