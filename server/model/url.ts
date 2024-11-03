import { model, Schema } from "mongoose";

interface UrlType {
  url: string;
  shortId: string;
  //userId: string;
  visitHistory?: [
    {
      timestamp: Date;
    },
  ];
}

const UrlSchema = new Schema<UrlType>(
  {
    url: {
      type: String,
      required: true,
    },
    shortId: {
      type: String,
      required: true,
    },
    //userId: {
    //  type: String,
    //  ref: "User",
    //},
    visitHistory: [
      {
        timestamp: Date,
      },
    ],
  },
  { timestamps: true },
);

const Url = model("Url", UrlSchema);

export default Url;
