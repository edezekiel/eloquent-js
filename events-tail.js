let dots = [];

for (let i = 0; i < 10; i++) {
  let dot = document.createElement('div')
  dot.className = 'trail';
  dot.style.left = 0;
  dot.style.top = 0;
  document.body.appendChild(dot);
  dots.push(dot);
}
function trail(event) {
  const lastDiv = dots.pop();
  lastDiv.style.left = event.pageX + 'px';
  lastDiv.style.top = event.pageY + 'px';
  dots.unshift(lastDiv);
}

window.addEventListener('mousemove', trail);