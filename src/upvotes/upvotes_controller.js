import Upvote from "./upvotes_model.js";

export async function destroy(req, res, next) {
  try {
    const { id } = req.params;
    const upvote = await Upvote.findOne({
      where: {
        id
      }
    });

    await upvote.destroy();
    res.status(200).send(upvote);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function upvoteAnswer(req, res, next) {
  try {
    const { id } = req.params;
    const upvote = await Upvote.create({
      userId: req.userId,
      answerId: Number(id)
    });

    res.status(200).send(upvote);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function upvoteQuestion(req, res, next) {
  try {
    const { id } = req.params;
    const upvote = await Upvote.create({
      userId: req.userId,
      questionId: Number(id)
    });

    res.status(200).send(upvote);
  } catch (error) {
    res.status(400).send(error);
  }
}
