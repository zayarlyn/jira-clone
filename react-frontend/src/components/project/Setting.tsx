import { Button, ChakraProvider, Stack } from "@chakra-ui/react";
import { FieldError, FieldValues, useForm } from "react-hook-form";
import InputWithValidation from "../util/InputWithValidation";
import { Icon } from "@iconify/react";
import MemberInput from "./MemberInput";
import {
  selectCurrentProject,
  useUpdateProjectMutation,
} from "../../api/project.endpoint";
import { useParams } from "react-router-dom";
import { selectMembers } from "../../api/member.endpoint";
import { selectAuthUser } from "../../api/auth.endpoint";

const Setting = () => {
  const [updateProject, { isLoading, isSuccess }] = useUpdateProjectMutation();
  const projectId = Number(useParams().projectId);
  const { members } = selectMembers(projectId);
  const { authUser: u } = selectAuthUser();
  const { project } = selectCurrentProject(projectId);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (!project || !members || !u) return null;

  const { id, name, descr, repo } = project;
  const isAdmin = members.filter(({ userId: uid }) => uid === u.id)[0].isAdmin;

  const onSubmit = (formData: FieldValues) => {
    if (
      formData.name === name &&
      formData.descr === descr &&
      formData.repo === repo
    )
      return;
    updateProject({ id, ...formData });
  };

  return (
    <ChakraProvider>
      <div className="mt-10 px-10">
        <h1 className="mb-4 text-xl font-semibold text-c-text">
          Project Setting
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4} maxW={480}>
            <InputWithValidation
              defaultValue={name}
              label="Name"
              placeholder="project name"
              register={register("name", {
                required: { value: true, message: "name must not be empty" },
              })}
              error={errors.name as FieldError}
              darkEnabled
              readOnly={!isAdmin}
            />
            <InputWithValidation
              defaultValue={descr}
              label="Description"
              placeholder="project description"
              register={register("descr")}
              error={errors.descr as FieldError}
              darkEnabled
              readOnly={!isAdmin}
            />
            <InputWithValidation
              defaultValue={repo}
              label="Repository"
              placeholder="github repo link"
              register={register("repo")}
              error={errors.repo as FieldError}
              darkEnabled
              readOnly={!isAdmin}
            />
            <MemberInput members={members} projectId={id} readOnly={!isAdmin} />
          </Stack>
          <div className="mt-6">
            {!isAdmin && (
              <span className="block text-sm text-red-400">
                * Only Admin can edit the project setting *
              </span>
            )}
            <button
              disabled={!isAdmin}
              className={`btn mt-3 ${
                !isAdmin ? "pointer-event-none cursor-not-allowed" : ""
              }`}
            >
              {isSuccess
                ? "Saved Changes"
                : isLoading
                ? "saving changes..."
                : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </ChakraProvider>
  );
};

export default Setting;
