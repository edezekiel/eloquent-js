// Eloquent JS solution (tweaked to node.data.tabname)

function asTabs(node) {
  const tabs = Array.from(node.children).map(node => {
    let button = document.createElement('button');
    button.textContent = node.dataset.tabname;
    let tab = { node, button };
    button.addEventListener('click', () => selectTab(tab));
    return tab;
  });

  let tabList = document.createElement("div");
  for (let { button } of tabs) tabList.appendChild(button);
  node.insertBefore(tabList, node.firstChild);

  function selectTab(selectedTab) {
    for (let tab of tabs) {
      let selected = tab == selectedTab;
      tab.node.style.display = selected ? "" : "none";
      tab.button.style.color = selected ? "red" : "";
    }
  }
  selectTab(tabs[0]);
}

asTabs(document.querySelector("tab-panel"));

// My original solution
function asTabs(node) {
  const tabs = Array.from(node.children);
  tabs.forEach(tab => tab.style.display = 'none');
  const tabLength = tabs.length;
  let buttons = [];

  for (let i = tabLength - 1; i > -1; i--) {

    let button = document.createElement('button');
    button.textContent = tabs[i].dataset.tabname;

    button.addEventListener('click', (event) => {
      const name = event.target.textContent;
      tabs.forEach(tab => {
        if (name === tab.dataset.tabname) {
          tab.style.display = 'block';
        } else {
          tab.style.display = 'none';
        }
      })

    });

    buttons.push(button)
  }

  buttons.forEach(button => node.prepend(button));
}
asTabs(document.querySelector("tab-panel"));
