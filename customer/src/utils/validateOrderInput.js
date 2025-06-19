// export const validateInput = (shippingInfo) => {
//   const nameRegex = /^[a-zA-ZÀ-ỹà-ỹ\s]+$/u;
//   const phoneRegex = /^[0-9]{10}$/;

//   if (
//     !shippingInfo.firstName ||
//     !shippingInfo.lastName ||
//     !shippingInfo.address ||
//     !shippingInfo.phone
//   ) {
//     return { success: false, message: "Vui lòng điền đầy đủ tất cả các thông tin." };
//   }

//   if (
//     !nameRegex.test(shippingInfo.firstName) ||
//     !nameRegex.test(shippingInfo.lastName)
//   ) {
//     return { success: false, message: "Họ và tên không được chứa ký tự đặc biệt hoặc số." };
//   }

//   if (shippingInfo.address.length > 255) {
//     return { success: false, message: "Địa chỉ không được vượt quá 255 ký tự." };
//   }

//   if (!phoneRegex.test(shippingInfo.phone)) {
//     return { success: false, message: "Số điện thoại phải đúng 10 chữ số và không có ký tự đặc biệt." };
//   }

//   return { success: true };
// };
