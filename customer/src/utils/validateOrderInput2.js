// // src/tests/validateOrderInput.test.js
// // import { validateInput } from './validateOrderInput'

// import * as api from "../redux/api/customerapi";

// describe("Hàm validateInput", () => {
//   it("trả về false nếu địa chỉ vượt quá 255 ký tự", () => {
//     const input = {
//       firstName: "Tú",
//       lastName: "Bùi",
//       address: "a".repeat(256),
//       phone: "0123456789"
//     };
//     expect(validateInput(input)?.success).toBe(false);
//     if(validateInput(input)?.success == false){
//       console.log("Testcase địa chỉ vượt quá 255 ký tự: ✅")
//     }else{
//       console.log("Testcase địa chỉ vượt quá 255 ký tự: ❌")
//     }
//   });

//     it("trả về false nếu họ, tên có ký tự đặc biệt", () => {
//     const input = {
//       firstName: "Tú@",
//       lastName: "Bùi@-",
//       address: "97 Man thien",
//       phone: "0123456789"
//     };
//     expect(validateInput(input)?.success).toBe(false);
//     if(validateInput(input)?.success == false){
//       console.log("Testcase họ,tên có ký tự đặc biệt: ✅")
//     }else{
//       console.log("Testcase họ,tên có ký tự đặc biệt: ❌")
//     }
//   });

//   it("trả về false nếu thiếu họ", () => {
//     const input = {
//       firstName: "",
//       lastName: "Bùi",
//       address: "97 Man Thiện",
//       phone: "0123456789"
//     };
//     if(validateInput(input)?.success == false){
//       console.log("Testcase nhập thiếu thông tin: ✅")
//     }else{
//       console.log("Testcase nhập thiếu thông tin: ❌")
//     }
//   });

//   it("trả về true nếu mọi thông tin hợp lệ", () => {
//     const input = {
//       firstName: "Tú",
//       lastName: "Bùi",
//       address: "97 Man Thiện",
//       phone: "0123456789"
//     };
//     if(validateInput(input)?.success == true){
//       console.log("Testcase nhập thông tin hợp lệ: ✅")
//     }else{
//       console.log("Testcase nhập thông tin hợp lệ: ❌")
//     }
//   });
// });



// const validateInput = async (shippingInfo) => {
//   const nameRegex = /^[a-zA-ZÀ-ỹà-ỹ\s]+$/u;
//   const phoneRegex = /^[0-9]{10}$/;

//   //  const res = await api.addOrder(orderData)
//   // if(res.data.success){
//   //    return { success: false};
//   // }else{
//   //   return {success: true}
//   // }
//   if (
//     !shippingInfo?.firstName ||
//     !shippingInfo?.lastName ||
//     !shippingInfo?.address ||
//     !shippingInfo?.phone
//   ) {
//     return { success: false, message: "Vui lòng điền đầy đủ tất cả các thông tin." };
//   }

//   if (
//     !nameRegex.test(shippingInfo?.firstName) ||
//     !nameRegex.test(shippingInfo?.lastName)
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
