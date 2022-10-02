export const cleanBuildFolder = () => {
    return plugins.del(path.build.root)
}