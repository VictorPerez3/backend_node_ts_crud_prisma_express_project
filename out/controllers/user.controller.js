var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var _a;
import Service from "../services/user.service";
//lida com as requisições HTTP e chama os métodos correspondentes
//do serviço.
class Controller {}
_a = Controller;
//////////////////////////////////////
Controller.getAll = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const users = yield Service.getAll();
      console.log(users);
      res.json({
        success: true,
        payload: users,
      });
      return next();
    } catch (err) {
      res.status(500).json({
        error: "Server error!",
      });
      return next(err);
    }
  });
////////////////////////////////////////
Controller.getById = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { id } = req.params;
      const user = yield Service.getById(Number(id));
      res.json({
        success: true,
        payload: user,
      });
      return next();
    } catch (err) {
      res.status(500).json({
        error: "Server error!",
      });
      return next(err);
    }
  });
//////////////////////////////////////////
Controller.create = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const userCreate = yield Service.create(req.body);
      res.json({
        success: true,
        payload: userCreate,
      });
      return next();
    } catch (err) {
      res.status(500).json({
        error: "Server error!",
      });
      return next(err);
    }
  });
////////////////////////////////////////////
Controller.update = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const usersUpdateById = yield Service.update(
        parseInt(req.params.id),
        req.body,
      );
      res.json({
        success: true,
        payload: usersUpdateById,
      });
      return next();
    } catch (err) {
      res.status(500).json({
        error: "Server error!",
      });
      return next(err);
    }
  });
/////////////////////////////////////////////
Controller.destroy = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const usersDeleteById = yield Service.destroy(parseInt(req.params.id));
      res.json({
        success: true,
        payload: usersDeleteById,
      });
      return next();
    } catch (err) {
      res.status(500).json({
        error: "Server error!",
      });
      return next(err);
    }
  });
export default Controller;
//# sourceMappingURL=user.controller.js.map
