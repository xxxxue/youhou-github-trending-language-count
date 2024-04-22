// ==UserScript==
// @name         github trending 编程语言数量统计
// @namespace    http://tampermonkey.net/
// @version      2024-02-23
// @description  try to take over the world!
// @author       You
// @match        https://github.com/trending*
// @icon
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  function createTable() {
    let langList = [];
    let spanList = document.querySelectorAll('span[itemprop="programmingLanguage"]');

    for (const item of spanList) {
      langList.push(item.textContent);
    }
    let obj = {};
    for (let i = 0; i < langList.length; i++) {
      let item = langList[i];
      if (obj[item]) {
        obj[item] += 1;
      } else {
        obj[item] = 1;
      }
    }
    let sortedArray = Object.entries(obj).sort((a, b) => b[1] - a[1]);

    // 将排序后的数组转换为普通对象形式
    let sortedObj = sortedArray.reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});

    console.log(sortedObj);

    // const node = document.createElement("pre");
    // node.innerHTML = JSON.stringify(sortedObj, null, 2)
    // node.style = "border: 1px solid red";

    // document.querySelector("h1.h1").parentElement.appendChild(node)

    // 创建表格
    let table = document.createElement("table");
    table.style = "margin: 0 auto;";
    table.id = "langCountTable";

    // 创建表头
    let thead = document.createElement("thead");
    let tr = document.createElement("tr");

    let thtdStyle = "border: 1px solid black;padding: 0px 3px; text-align: center;";
    let thStyle = "background-color: #f2f2f2;";

    let th1 = document.createElement("th");
    th1.style = thtdStyle + thStyle;
    th1.innerHTML = "语言";
    tr.appendChild(th1);

    let th2 = document.createElement("th");
    th2.style = thtdStyle + thStyle;
    th2.innerHTML = "数量";
    tr.appendChild(th2);

    thead.appendChild(tr);
    table.appendChild(thead);

    // 创建表格数据
    let tbody = document.createElement("tbody");
    for (let i = 0; i < sortedArray.length; i++) {
      let tr = document.createElement("tr");

      let td1 = document.createElement("td");
      td1.style = thtdStyle;
      td1.innerHTML = sortedArray[i][0];
      tr.appendChild(td1);

      let td2 = document.createElement("td");
      td2.style = thtdStyle;
      td2.innerHTML = sortedArray[i][1];
      tr.appendChild(td2);

      tbody.appendChild(tr);
    }
    table.appendChild(tbody);

    // 将表格添加到页面中
    appendChildToPage(table);

    let div = createDiv();
    div.innerHTML = "<h1>常用语言链接</h1>";
    appendChildToPage(div);

    let ul = createUl();
    ul.appendChild(createLi(createLanguageLink("c#")));
    ul.appendChild(createLi(createLanguageLink("java")));
    ul.appendChild(createLi(createLanguageLink("javascript")));
    ul.appendChild(createLi(createLanguageLink("typescript")));
    ul.appendChild(createLi(createLanguageLink("python")));
    appendChildToPage(ul);
  }

  function createDiv() {
    let div = document.createElement("div");
    return div;
  }

  function createUl() {
    let ul = document.createElement("ul");
    ul.style = "list-style: none;";
    return ul;
  }

  function createLi(element) {
    let li = document.createElement("li");
    li.style = "list-style: none;";
    li.appendChild(element);
    return li;
  }

  function createLanguageLink(name, urlName) {
    if (urlName == undefined) {
      urlName = name;
    }
    let a = document.createElement("a");
    a.href = `https://github.com/trending/${encodeURIComponent(urlName)}?since=daily`;
    a.innerHTML = name;
    return a;
  }

  function appendChildToPage(element) {
    document.querySelector("h1.h1").parentElement.appendChild(element);
  }

  createTable();
})();
