const { StatusCodes } = require("http-status-codes");
const Jobs = require("../models/Jobs");

exports.getAllJobs = async (req, res) => {
  const jobs = await Jobs.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};
exports.getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Jobs.findOne({ _id: jobId, createdBy: userId });
  if (!job) {
    return res.status(StatusCodes.NOT_FOUND).send("No job with this id");
  }
  res.status(StatusCodes.OK).json({ job });
};
exports.createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Jobs.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};
exports.updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;
  if (company === "" || position === "") {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("company or position fields can't be empty");
  }
  const job = await Jobs.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    return res.status(StatusCodes.NOT_FOUND).send("No job with this id");
  }
  res.status(StatusCodes.OK).json({ job });
};
exports.deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Jobs.findByIdAndRemove({
    _id: jobId,
    createdBy: userId,
  });
  if (!job) {
    return res.status(StatusCodes.NOT_FOUND).send("No job with this id");
  }
  res.status(StatusCodes.OK).send();
};
