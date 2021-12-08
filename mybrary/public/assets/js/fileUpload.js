// Register the plugin
FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginFileEncode,
    FilePondPluginImageResize
)

FilePond.setOptions({
    stylePanelAspectRatio: 150 / 100,
    imageResizeTargetHeight: 150,
    imageResizeTargetWidth: 100
})

FilePond.parse(document.body)