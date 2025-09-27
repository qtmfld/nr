function newListItem(item) {
  const title = item.getElementsByTagName("title")[0];
  const link = item.getElementsByTagName("link")[0];

  const tn = document.createTextNode(title.textContent);
  const a = document.createElement("a");
  a.setAttribute("href", link.textContent);
  a.appendChild(tn);

  const li = document.createElement("li");
  li.appendChild(a);
  return li;
}

function getXML(url, cook) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.responseType = "document";
  xhr.onload = () => {
    if (xhr.readyState === xhr.DONE && xhr.status === 200) {
      const items = xhr.responseXML.getElementsByTagName("item");
      cook(items);
    }
  }
  xhr.send();
}

function update(category) {
  const url = "https://www.nhk.or.jp/rss/news/" + category + ".xml";
  getXML(url, (items) => {
    const section = document.getElementById(category);
    const ul = section.getElementsByTagName("ul")[0];
    const n = items.length;
    for (i = 0; i < n && i < 20; i++) {
      const li = newListItem(items[i]);
      ul.appendChild(li);
    }
  });
}
