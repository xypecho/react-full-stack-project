/*
 * @Author: xueyp
 * @Date: 2019-11-13 17:11:10
 * @Last Modified by: xueyp
 * @Last Modified time: 2019-11-13 18:00:32
 * @description: 一些工具
 */
export default class Tools {
    // 格式化‘15天内新增注册用户的图表’接口返回的数据,
    // 预期的数据格式为  [{ name: '2018-05-22', count: 32371 },{ name: '2018-05-23', count: 12328 }]
    formatterChartsData(data) {
        // console.log('==============')
        // console.log(data)
        // console.log(data.length)
        // console.log('==============')

        const tempArr = [];
        const arr = [];
        // 获取15天内所有的时间
        const now = new Date().getTime();
        const fifteenDayAgo = now - (15 * 24 * 60 * 60 * 1000);
        const oneDay = 1000 * 60 * 60 * 24;
        for (let i = fifteenDayAgo; i <= now; i += oneDay) {
            // console.log(new Date(i).toDateString())
            tempArr.push({ name: `${new Date(i).getFullYear()}-${new Date(i).getMonth() + 1}-${new Date(i).getDate()}`, count: 0 })
        }
        if (data.length === 0) {
            return tempArr;
        } else {
            data.forEach(ele => arr.push(new Date(ele.register_time).toDateString()));
            tempArr.forEach((item, key) => {
                // if (arr[key] && new Date(item.name).toDateString() === new Date(arr[key]).toDateString()) {
                //     item.count += 1;
                // }
                // console.log(new Date(item.name).toDateString())
                if (arr.includes(new Date(item.name).toDateString())) {
                    item.count += 1;
                }
            })
            console.log(arr)
            console.log(tempArr)
            return tempArr;
        }
    }
}
