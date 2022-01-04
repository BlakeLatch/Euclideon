function udSDKJS_RegisterShared()
{
	udSDKJS_CreateShared = Module.cwrap('udSDKJS_CreateShared', 'number', ['string', 'string', 'string'])
	udSDKJS_CreateSharedFromDomain = Module.cwrap('udSDKJS_CreateSharedFromDomain', 'number', ['string'])
	udSDKJS_DestroyShared = Module.cwrap('udSDKJS_DestroyShared', 'number', [])

	udSDKJS_LoadModel = Module.cwrap('udSDKJS_LoadModel', 'number', ['string']);
	udSDKJS_ReleaseModel = Module.cwrap('udSDKJS_ReleaseModel', 'number', ['number']);

	udSDKJS_ResizeScene = Module.cwrap('udSDKJS_ResizeScene', 'number', ['number', 'number', 'number', 'number']);
	udSDKJS_SetMatrix = Module.cwrap('udSDKJS_SetMatrix', 'number', ['string', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number']);

	udSDKJS_RenderQueueAddModel = Module.cwrap('udSDKJS_RenderQueueAddModel', 'number', ['number', 'number', 'number']); // Model, Elevation, Zone (-1 for Esri ECEF, 0 for Local)
	udSDKJS_RenderQueueClear = Module.cwrap('udSDKJS_RenderQueueClear', 'number', []);
	udSDKJS_RenderQueue = Module.cwrap('udSDKJS_RenderQueue', 'number', []);

	udSDKJS_GetColourBuffer = Module.cwrap('udSDKJS_GetColourBuffer', 'array', []);
	udSDKJS_GetDepthBuffer = Module.cwrap('udSDKJS_GetDepthBuffer', 'array', []);
}

function udSDKJS_Login(username, password, application)
{
	udSDKJS_RegisterShared();
	return udSDKJS_CreateShared(username, password, application)
}

function udSDKJS_Domain(application)
{
	udSDKJS_RegisterShared();
	return udSDKJS_CreateSharedFromDomain(application)
}
