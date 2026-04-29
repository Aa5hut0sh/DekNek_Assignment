import { Router } from "express";
import {
  bulkBlogController,
  deleteBlogController,
  editBlogController,
  publishBlogController,
  userBlogsController,
  getBlogById
} from "../controllers/blog.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.get("/bulk" , bulkBlogController);
router.post("/publish", authenticate, publishBlogController);
router.put("/edit/:id", authenticate, editBlogController);
router.delete("/delete/:id", authenticate, deleteBlogController);
router.get("/myblogs", authenticate, userBlogsController);
router.get("/:id", getBlogById);

export default router;
