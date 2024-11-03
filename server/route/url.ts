import { Router } from "express";
import Url from "../model/url";
import { nanoid } from "nanoid";

const urlRouter = Router();

urlRouter
  .route("/")
  .get(async (_req, res) => {
    try {
      const shortenUrls = await Url.find();

      res.json({ data: shortenUrls });
      return;
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: (error as any).message });
    }
  })
  .post(async (req, res) => {
    let { url } = req.body;

    if (!url.startsWith("https://")) {
      url = "https://" + url;
    }

    const shortId = nanoid(8);

    const entry = new Url({ shortId, url });

    try {
      const savedEntry = await entry.save();

      res.status(200).json({ entry: savedEntry });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: (err as any).message });
    }
  });

urlRouter.route("/:shortId").get(async (req, res) => {
  const { shortId } = req.params;

  try {
    const url = await Url.findOne({ shortId });
    url?.visitHistory?.push({ timestamp: new Date() });
    await url?.save();
    res.redirect(url?.url as string);
    return;
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: (error as any).message });
  }
});

urlRouter
  .route("/url/:shortId")
  .get(async (req, res) => {
    const { shortId } = req.params;

    try {
      const url = await Url.findOne({ shortId }, { _id: 0 });

      if (!url) {
        res.status(404).json({ message: "ShortId not found" });
        return;
      }

      res.json({ history: url.visitHistory });
      return;
    } catch (err) {
      //console.log(err);
      res.status(500).json({ message: (err as any).message });
      return;
    }
  })
  .delete(async (req, res) => {
    const { shortId } = req.params;

    try {
      await Url.deleteOne({ shortId });
      res.json({ message: "Url Deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: (err as any).message });
    }
  });

urlRouter.put("/:id", async (req, res) => {
  const { id } = req.params;

  const { url, shortId } = req.body;

  try {
    const updatedData = await Url.findByIdAndUpdate(
      id,
      { url, shortId },
      { new: true },
    );

    res.json({ data: updatedData });
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: (err as any).message });
  }
});

export default urlRouter;
