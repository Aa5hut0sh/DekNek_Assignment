import api from './../lib/api';

export const getAllBlogs = async()=>{
    const response = await api.get("/blog/bulk");
    return response.data.blogs;
}
export const getAllUserBlogs = async()=>{
    const response = await api.get("/blog/myblogs");
    return response.data.blogs;
}
export const createBlog = async( title:string , content :string , published:boolean)=>{
    const response = await api.post("/blog/publish" , {title , content , published});
    return response.data;
}

export const editBlog = async(id:number , title?:string , content?:string , published?:boolean)=>{
    const payload = Object.fromEntries(
    Object.entries({ title, content, published }).filter(
      ([_, v]) => v !== undefined
    )
  );

    const response = await api.put(`/blog/edit/${id}` , payload);
    return response.data;
}
export const deleteBlog = async(id:number)=>{
    const response = await api.delete(`/blog/delete/${id}`);
    return response.data;
}

export const getBlogById = async (id: number) => {
    const response = await api.get(`/blog/${id}`);
    return response.data.blog;
}



