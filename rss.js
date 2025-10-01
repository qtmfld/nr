function update(category) {
  const url = "https://news.web.nhk/n-data/conf/na/rss/" + category + ".xml";
  getXML(url, (xml) => {
    const entries = collectEntries(xml);
    showEntries(entries, category);
  });
}

function getXML(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.setRequestHeader("Origin", "https://qtmfld.github.io");
  xhr.responseType = "document";
  xhr.onload = () => {
    if (xhr.readyState === xhr.DONE && xhr.status === 200) {
      callback(xhr.responseXML);
    }
  }
  xhr.send();
}

function collectEntries(xml) {
  const items = xml.getElementsByTagName("item");
  const entries = [];
  for (const item of items) {
    const title = item.getElementsByTagName("title")[0].textContent;
    const link  = item.getElementsByTagName("link")[0].textContent;
    const entry = { title: title, link: link };
    entries.push(entry);
  }
  return entries;
}

function showEntries(entries, category) {
  const section = document.getElementById(category);
  const ul = section.getElementsByTagName("ul")[0];
  const n = entries.length;
  for (i = 0; i < n && i < 20; i++) {
    const li = listItem(entries[i]);
    ul.appendChild(li);
  }
}

function listItem(entry) {
  const li = document.createElement("li");
  const a  = document.createElement("a");
  const tn = document.createTextNode(entry.title);

  li.appendChild(a);
  a.appendChild(tn);
  a.setAttribute("href", entry.link);

  return li;
}
