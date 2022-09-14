import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
});

function showToaster(type, text) {
  Toast.fire({
    icon: type,
    title: text,
  });
}

async function confirmModal(text, yes, cancel) {
  const result = await Swal.fire({
    title: text,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: yes,
    cancelButtonText: cancel,
  });
  return result;
}

export { showToaster, confirmModal };
