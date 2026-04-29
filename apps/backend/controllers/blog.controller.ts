import type { Request, Response, NextFunction } from "express";
import prisma from "@repo/db/client";
import { success, z } from "zod";

const paramSchema = z.object({
  id: z.coerce.number().int().positive(),
});
const updatePostSchema = z.object({
  title: z.string().min(1).optional(),
  content: z.string().optional(),
  published: z.boolean().optional(),
});

const createPostSchema = z.object({
  title: z.string().min(1),
  content: z.string(),
  published: z.boolean(),
});

export const bulkBlogController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const blogs = await prisma.post.findMany({
      where: {
        published: true,
      },
    });

    res.status(200).json({
      success: true,
      blogs,
    });
  } catch (err) {
    next(err);
  }
};

export const publishBlogController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const body = req.body;
  try {
    const { success, data } = createPostSchema.safeParse(body);

    if (!success) {
      return res.status(400).json({
        success: false,
        message: "Invalid Input",
      });
    }

    const blog = await prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        published: data.published,
        author: {
          connect: {
            id: req.userId,
          },
        },
      },
    });

    return res.status(201).json({
      success: true,
      blog,
      message: "Your blog is published",
    });
  } catch (err) {
    next(err);
  }
};

export const editBlogController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const body = req.body;

  try {
    const parsed = paramSchema.safeParse(req.params);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid post id",
      });
    }

    const { success, data } = updatePostSchema.safeParse(body);

    if (!success) {
      return res.status(400).json({
        success: false,
        message: "Invalid Input",
      });
    }

    const postId = parsed.data.id;
    const userId = req.userId;

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    if (userId !== post.authorId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access to the blog",
      });
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: post.id,
      },
      data: data,
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
      },
    });

    return res.status(200).json({
      success: true,
      updatedPost,
      message: "Your Blog has been updated",
    });
  } catch (err) {
    next(err);
  }
};

export const userBlogsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const blogs = await prisma.post.findMany({
      where: {
        authorId: req.userId,
      },
    });

    return res.status(200).json({
      success: true,
      blogs,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteBlogController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parsed = paramSchema.safeParse(req.params);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid post id",
      });
    }

    const postId = parsed.data.id;
    const userId = req.userId;

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Blog has not found",
      });
    }

    if (userId !== post.authorId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access to the blog",
      });
    }

    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Your Blog has been deleted",
    });
  } catch (err) {
    next(err);
  }
};

export const getBlogById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {

  try{
    const parsed = paramSchema.safeParse(req.params);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid post id",
      });
    }

    const postId = parsed.data.id;

    const blog = await prisma.post.findUnique({
      where:{
        id:postId
      },
      select:{
        id:true,
        authorId:true,
        title:true,
        content:true,
        published:true,
        author:true,

      }
    });

    return res.status(200).json({
      success:true,
      blog
    });


  }catch(err){
    next(err);
  }
};
