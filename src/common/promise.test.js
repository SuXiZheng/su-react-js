function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

describe("Promise测试", () => {
  const fetchingData = (shouldRject = true) => {
    return new Promise((resolve, reject) => {
      if (shouldRject) {
        reject("出错啦");
      }
      resolve("成功");
    });
  };
  test("catch测试", async () => {
    try {
      const result = await fetchingData();
    } catch (error) {
      const s = error;
    }
  });

  test("进度测试", done => {
    const applyTemplate = day => {
      return new Promise((resolve, reject) => {
        // 模拟线程执行时间不定
        sleep(Math.random() * 10).then(result => {
          resolve(day);
        });
      });
    };

    var tasks = [];
    var progress = 0;
    var total = 100;
    for (var day = 1; day <= 100; day++) {
      var task = applyTemplate(day).then(result => {
        progress += 1;
        console.log(
          `day: ${result}线程完成，进度: ${(progress / total) * 100}`
        );
      });
      tasks.push(task);
    }
  });

  test("webSocket测试", () => {
    var websocket = new WebSocket();
  });
});
