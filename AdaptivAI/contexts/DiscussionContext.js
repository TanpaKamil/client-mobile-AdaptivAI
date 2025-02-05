import { createContext, useState, useContext } from 'react';
import axios from '../config/axiosInstance';

const DiscussionContext = createContext(null);

export function DiscussionProvider({ children }) {
   const [discussions, setDiscussions] = useState([]);
   const [loading, setLoading] = useState(false);

   const fetchDiscussions = async () => {
       try {
           setLoading(true);
           const { data } = await axios.get('/api/discussions');
           setDiscussions(data);
           return data;
       } catch (error) {
           console.error(error);
           return [];
       } finally {
           setLoading(false);
       }
   };

   const createDiscussion = async (formData) => {
       try {
           const { data } = await axios.post('/api/discussions', formData, {
               headers: { 'Content-Type': 'multipart/form-data' }
           });
           await fetchDiscussions();
           return { success: true };
       } catch (error) {
           return { success: false, error: error.response?.data?.message };
       }
   };

   const addComment = async (discussionId, content) => {
       try {
           await axios.patch(`/api/discussions/${discussionId}/comments`, { content });
           await fetchDiscussions();
           return { success: true };
       } catch (error) {
           return { success: false, error: error.response?.data?.message };
       }
   };

   const toggleLike = async (discussionId) => {
       try {
           await axios.patch(`/api/discussions/${discussionId}/likes`);
           await fetchDiscussions();
           return { success: true };
       } catch (error) {
           return { success: false };
       }
   };

   return (
       <DiscussionContext.Provider value={{
           discussions,
           loading,
           fetchDiscussions,
           createDiscussion,
           addComment,
           toggleLike
       }}>
           {children}
       </DiscussionContext.Provider>
   );
}

export const useDiscussions = () => useContext(DiscussionContext);