
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
