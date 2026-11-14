import { HelpingVerb } from "../../model/helpingVerb/helpingVerb.model.js";

const handleError = (res, error) => {
  if (error.name === "ValidationError" || error.name === "CastError") {
    return res.status(400).json({ message: error.message });
  }
  console.log(error);
  return res.status(500).json({ message: "Server error" });
};

export const createHelpingVerb = async (req, res) => {
  try {
    const { category, hindi, english, answer } = req.body;

    if (!category || !hindi || !english || !answer) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const helpingVerb = await HelpingVerb.create({
      category,
      hindi,
      english,
      answer,
    });

    res.status(201).json(helpingVerb);
  } catch (error) {
    return handleError(res, error);
  }
};

export const getHelpingVerbs = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};

    const helpingVerbs = await HelpingVerb.find(filter).sort({ createdAt: -1 });

    res.status(200).json(helpingVerbs);
  } catch (error) {
    return handleError(res, error);
  }
};

export const getHelpingVerbById = async (req, res) => {
  try {
    const helpingVerb = await HelpingVerb.findById(req.params.id);

    if (!helpingVerb) {
      return res.status(404).json({ message: "Helping verb not found" });
    }

    res.status(200).json(helpingVerb);
  } catch (error) {
    return handleError(res, error);
  }
};

export const updateHelpingVerb = async (req, res) => {
  try {
    const { category, hindi, english, answer } = req.body;

    const helpingVerb = await HelpingVerb.findByIdAndUpdate(
      req.params.id,
      { category, hindi, english, answer },
      { new: true, runValidators: true }
    );

    if (!helpingVerb) {
      return res.status(404).json({ message: "Helping verb not found" });
    }

    res.status(200).json(helpingVerb);
  } catch (error) {
    return handleError(res, error);
  }
};

export const deleteHelpingVerb = async (req, res) => {
  try {
    const helpingVerb = await HelpingVerb.findByIdAndDelete(req.params.id);

    if (!helpingVerb) {
      return res.status(404).json({ message: "Helping verb not found" });
    }

    res.status(200).json({ message: "Helping verb deleted", helpingVerb });
  } catch (error) {
    return handleError(res, error);
  }
};
