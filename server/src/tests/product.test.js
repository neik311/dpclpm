import { getProduct } from "../controllers/product";
import db from "../models";

describe("getProduct", () => {
  it("Tìm kiếm thành công", async () => {
    db.Product = {
      findOne: jest.fn().mockResolvedValue({ id: "1" }),
    };

    const req = { params: { id: "1" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getProduct(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("Tìm kiếm thất bại", async () => {
    db.Product = {
      findOne: jest.fn().mockResolvedValue(null),
    };

    const req = { params: { id: "1" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getProduct(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });
});
