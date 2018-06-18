import Upvote from "./upvotes_model.mjs";

export async function create(req, res, next) {
  try {
    const { questionId, answerId } = req.body;
    const { userId } = req;
    if (questionId) {
      const upvote = await Upvote.create({
        questionId,
        userId
      });
      res.status(200).send(upvote);
    } else if (answerId) {
      const upvote = await Upvote.create({
        answerId,
        userId
      });
      res.status(200).send(upvote);
    }
  } catch (error) {
    res.status(400).send(error);
  }
}

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
