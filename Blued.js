
// Blued 闪照提醒脚本 for Surge
// 作者: @coll1

let body = $response.body;

try {
  let json = JSON.parse(body);

  if (json?.data?.list?.length > 0) {
    for (let item of json.data.list) {
      if (item?.msg_type === 10 && item?.extras?.type === 7) {
        let flashId = item.extras.snap_id || item.extras.flash_id;
        let uid = item.uid;
        let url = `https://bldimg.blued.cn/image/view/?snap_id=${flashId}&from=im&uid=${uid}`;

        $notification.post("Blued 闪照提醒", `来自用户：${uid}`, "点击查看", {
          url: url
        });
        break;
      }
    }
  }
} catch (e) {
  console.log("Blued 闪照脚本解析异常: " + e);
}

$done({});
