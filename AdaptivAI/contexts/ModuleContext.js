import { createContext, useState, useContext } from "react";
import axios from "../config/axiosInstance";

const ModuleContext = createContext(null);

export function ModuleProvider({ children }) {
  const [modules, setModules] = useState([]);
  const [currentModule, setCurrentModule] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPublicModules = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/modules/pub");
      setModules(data.data.modules);
      return data.data.modules;
    } catch (error) {
      setError(error.response?.data?.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchFeaturedModules = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/modules/pub");
      setModules(data.data.modules);
      return data.data.modules;
    } catch (error) {
      setError(error.response?.data?.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchModuleById = async (moduleId) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/modules/pub/${moduleId}`);
      setCurrentModule(data.data.module);
      return data.data.module;
    } catch (error) {
      setError(error.response?.data?.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createModule = async (formData) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/modules", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return { success: true, moduleId: data.data.moduleId };
    } catch (error) {
      setError(error.response?.data?.message);
      return { success: false, error: error.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const startModuleInstance = async (moduleId) => {
    try {
      const { data } = await axios.post(`/api/modules/${moduleId}/start`);
      return { success: true, instance: data.data.instance };
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  };

  const submitAssessment = async (instanceId, answers) => {
    try {
      const { data } = await axios.post(
        `/api/modules/instances/${instanceId}/assessment`,
        {
          answers,
        }
      );
      return { success: true, evaluation: data.data.evaluation };
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  };

  return (
    <ModuleContext.Provider
      value={{
        modules,
        currentModule,
        loading,
        error,
        fetchPublicModules,
        fetchModuleById,
        createModule,
        startModuleInstance,
        submitAssessment,
      }}
    >
      {children}
    </ModuleContext.Provider>
  );
}

export const useModules = () => useContext(ModuleContext);
