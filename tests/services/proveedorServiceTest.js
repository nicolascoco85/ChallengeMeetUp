const expect = require("chai").expect;
let service = require("../../services/proveedorService");
let chai = require("chai");
let assert = chai.assert;

describe("Proveedor service", function () {
  describe("Aprovisionamiento de Cerveza", function () {
    it("Pregunto por dos personas con 25 grados de temperatura y espero un numero de cajas de cerveza ", async () => {
      const result = service.ObtenerNumeroDeCajas(2,25);
      expect(result).to.be.an("Number");
    });


    it("Pregunto por dos personas con 25 grados de temperatura y espero una caja de cerveza", async () => {
      const result = service.ObtenerNumeroDeCajas(2,25);
      expect(result).to.equal(1);
    });

    it("Pregunto por 1 personas con 25 grados de temperatura y espero una caja de cerveza, mas vale sque sobre", async () => {
      const result = service.ObtenerNumeroDeCajas(1,25);
      assert.isBelow(0, result);
    });

    it("Pregunto por 0 personas con 25 grados de temperatura y espero una caja de cerveza, mas vale sque sobre", async () => {
      const result = service.ObtenerNumeroDeCajas(0,25);
      expect(result).to.equal(0);
    });

    it("Pregunto por 30 personas con 25 grados de temperatura y espero 15 cajas de cerveza", async () => {
      const result = service.ObtenerNumeroDeCajas(30,25);
      expect(result).to.equal(15);
    });

    it("Pregunto por 30 personas con 21 grados de temperatura y espero 5 cajas de cerveza, mas vale sque sobre", async () => {
      const result = service.ObtenerNumeroDeCajas(30,21);
      expect(result).to.equal(5);
    });

    it("Pregunto por 30 personas con 19 grados de temperatura y espero 4 cajas de cerveza, mas vale sque sobre", async () => {
      const result = service.ObtenerNumeroDeCajas(30,19);
      expect(result).to.equal(4);
    });
  });
});
