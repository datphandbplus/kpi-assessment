"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowsToJson = void 0;
const Treeize = require("treeize");
class RowsToJson {
    mapViewResultWithJson(viewResult, detectCollectionsFlag = true) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let sqlView = new Treeize();
                sqlView.setOptions({ input: { delimiter: '__', detectCollections: detectCollectionsFlag }, output: { prune: false } });
                sqlView.grow(viewResult);
                var jsonResult = yield sqlView.getData();
                return jsonResult;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.RowsToJson = RowsToJson;