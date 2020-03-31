export const validateProjectName: (projectName: string) => Boolean = (projectName: string) => {
    return projectName.length >= 2
}