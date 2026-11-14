import express from "express";
import { isAuthentication } from "../../autorized/isAuthorize.js";
import {
  createHelpingVerb,
  deleteHelpingVerb,
  getHelpingVerbById,
  getHelpingVerbs,
  updateHelpingVerb,
} from "../../controllers/helpingVerb/helpingVerb.controllers.js";

const router = express.Router();

router.post("/", isAuthentication, createHelpingVerb);
router.get("/", getHelpingVerbs);
router.get("/:id", getHelpingVerbById);
router.put("/:id", isAuthentication, updateHelpingVerb);
router.delete("/:id", isAuthentication, deleteHelpingVerb);

export default router;
