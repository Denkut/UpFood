const Ration = require("../models/Ration");

//add
async function addRation(ration) {
  const newRation = await Ration.create(ration);

  await newRation.populate("meals.id");
  
  return newRation;
}

//edit
async function editRation(id, ration) {
  const newRation = await Ration.findByIdAndUpdate(id, ration, {
    returnDocument: "after",
  }).populate("meals.id");

  return newRation;
}

//delete
function deleteRation(id) {
  return Ration.deleteOne({ _id: id }).populate("meals.id");
}

//get list with search and pagination
async function getRations(search = "", limit = 10, page = 1) {
  const [rations, count] = await Promise.all([
    Ration.find({ title: { $regex: search, $options: "i" } })
      .populate("meals.id")
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 }),
    Ration.countDocuments({ title: { $regex: search, $options: "i" } }),
  ]);

  return {
    rations,
    lastPage: Math.ceil(count / limit),
  };
}

//get item
function getRation(id) {
  return Ration.findById(id).populate("meals.id");
}

module.exports = {
  addRation,
  editRation,
  deleteRation,
  getRations,
  getRation,
};
