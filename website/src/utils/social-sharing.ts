const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    alert("Đã sao chép liên kết!");
  } catch (err) {
    console.error("Lỗi khi sao chép:", err);
  }
};

const shareOnFacebook = () => {
  const url = encodeURIComponent(window.location.href);
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;

  window.open(facebookShareUrl, "_blank", "width=600,height=400");
};





export {
  copyLink,
  shareOnFacebook
}