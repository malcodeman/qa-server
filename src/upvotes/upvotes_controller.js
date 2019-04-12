import Upvote from "./upvotes_model.js";

export async function upvoteAnswer(req, res, next) {
  try {
    const { id } = req.params;
    const upvote = await Upvote.create({
      answerId: Number(id),
      userId: req.userId
    });

    res.status(200).send(upvote);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function downvoteAnswer(req, res, next) {
  try {
    const { id } = req.params;
    const upvote = await Upvote.findOne({
      where: {
        answerId: Number(id),
        userId: req.userId
      }
    });

    await upvote.destroy();
    res.status(200).send(upvote);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function upvoteQuestion(req, res, next) {
  try {
    const { id } = req.params;
    const upvote = await Upvote.create({
      questionId: Number(id),
      userId: req.userId
    });

    res.status(200).send(upvote);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function downvoteQuestion(req, res, next) {
  try {
    const { id } = req.params;
    const upvote = await Upvote.findOne({
      where: {
        questionId: Number(id),
        userId: req.userId
      }
    });

    await upvote.destroy();
    res.status(200).send(upvote);
  } catch (error) {
    res.status(400).send(error);
  }
}
