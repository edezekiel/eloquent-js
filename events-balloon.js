function resize(event) {
  const balloon = document.querySelector('p');

  if (!balloon.style.fontSize) {
    balloon.style.fontSize = '16px';
  }

  let originalSize = balloon.style.fontSize.split('px')[0];

  if (event.key === 'ArrowUp') {
    let grow = originalSize * 1.1;
    balloon.style.fontSize = grow.toString().concat('px');
  } else if (event.key === 'ArrowDown') {
    let shrink = originalSize * 0.9;
    balloon.style.fontSize = shrink.toString().concat('px');
  }

  if (originalSize > 50) {
    balloon.textContent = '💥';
    balloon.style.fontSize = '16px';
    window.removeEventListener('keydown', resize);
  }

  event.preventDefault()
}

window.addEventListener('keydown', resize);