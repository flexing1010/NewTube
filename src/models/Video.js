import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 80 },
  description: { type: String, required: true, trim: true, minLength: 5 },
  //default에 Date.now를 사용함으로 써 Video.create에 createdAt을 설정 할 필요없이
  //자동적으로 생성되게 했다
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
});

//it's a convetion to use uppercase for model
const Video = mongoose.model("Video", videoSchema);

export default Video;
