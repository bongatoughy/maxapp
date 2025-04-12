import React, { memo, useEffect, useState } from "react";
import { PrimarySearchAppBar } from "./app-bar";
import { ExampleWithLocalizationProvider } from "./advanced-table";
import { FormDialog } from "./form-dialog";
import { useAuth } from "./AuthContext";

const FETCH_PROJECTS_URL = `https://khip7gmzgqkn4flgpd3s7vzske0wmaot.lambda-url.us-east-1.on.aws/`;

export const Home = memo(() => {
  const [projects, setProjects] = useState([]);
  const [isFetchingProjects, setIsFetchingProjects] = useState(false);
  const { accessToken } = useAuth();

  useEffect(() => {
    const fetchProjects = async () => {
      setIsFetchingProjects(true);
      const resp = await fetch(FETCH_PROJECTS_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const json = await resp.json();
      setProjects(json);
      setIsFetchingProjects(false);
    };
    fetchProjects();
  }, []);

  return (
    <>
      <PrimarySearchAppBar />
      <FormDialog projects={projects} setProjects={setProjects} />
      <ExampleWithLocalizationProvider
        projects={projects}
        setProjects={setProjects}
        isFetchingProjects={isFetchingProjects}
      />
    </>
  );
});
