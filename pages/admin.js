export default function AdminRedirect() {
  if (typeof window !== "undefined") {
    window.location.href = "/admin/";
  }
  return null;
}
