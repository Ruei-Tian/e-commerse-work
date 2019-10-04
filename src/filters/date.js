export default function (timestamp) {
    const dates = new Date(timestamp * 1000);  //因為一般 timestamp 取得的是秒數，但在 JavaScript 中要帶入的是毫秒，所以要 new Date(timestamp * 1000)
    let year = dates.getFullYear();
    let month = dates.getMonth() + 1;
    let date = dates.getDate();    
    return `${year}/${month}/${date}`;
    
  }