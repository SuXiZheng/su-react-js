describe('Promise测试', () => {
    const fetchingData = (shouldRject = true) => {
        return new Promise((resolve, reject) => {
            if (shouldRject) {
                reject('出错啦');
            }
            resolve('成功');
        });
    };
    test('catch测试', async () => {
        try {
            const result = await fetchingData();
        } catch (error) {
            const s = error;
        }
    });
});