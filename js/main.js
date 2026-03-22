document.addEventListener('DOMContentLoaded', () => {
  const aboutWindow = document.getElementById('about-window');
  const openAbout = document.querySelector('.folder-open');
  const closeAbout = document.querySelector('.window-close');
  const minimizeAbout = document.querySelector('.window-minimize');
  const folderItems = document.querySelectorAll('[data-placeholder]');
  const toast = document.getElementById('desktop-toast');
  const copyMailButton = document.getElementById('copy-mail');

  const portfolioConfig = {
    email: 'tonadresse@mail.com'
  };

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('visible');
    window.clearTimeout(showToast._timer);
    showToast._timer = window.setTimeout(() => {
      toast.classList.remove('visible');
    }, 2200);
  };

  if (openAbout && aboutWindow) {
    openAbout.addEventListener('click', () => {
      aboutWindow.hidden = false;
    });
  }

  if (closeAbout && aboutWindow) {
    closeAbout.addEventListener('click', () => {
      aboutWindow.hidden = true;
    });
  }

  if (minimizeAbout && aboutWindow) {
    minimizeAbout.addEventListener('click', () => {
      aboutWindow.hidden = true;
      showToast('Fenêtre réduite');
    });
  }

  folderItems.forEach((item) => {
    item.addEventListener('click', () => {
      showToast(item.dataset.placeholder);
    });
  });

  if (copyMailButton) {
    copyMailButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(portfolioConfig.email);
        showToast('Adresse mail copiée');
      } catch (error) {
        showToast('Impossible de copier le mail');
      }
    });
  }
});
function updatePhoneTime() {
  const phoneTime = document.getElementById("phone-time");
  if (!phoneTime) return;

  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  phoneTime.textContent = `${hours}:${minutes}`;
}

updatePhoneTime();
setInterval(updatePhoneTime, 1000);
const startTransition = document.getElementById("start-transition");
const consoleShutdown = document.getElementById("console-shutdown");

if (startTransition && consoleShutdown) {
  startTransition.addEventListener("click", function (e) {
    e.preventDefault();

    consoleShutdown.classList.add("active");

    setTimeout(() => {
      window.location.href = startTransition.getAttribute("href");
    }, 700);
  });
}