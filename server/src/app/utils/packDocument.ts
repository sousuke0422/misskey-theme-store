import IDocument from '../../core/IDocument';
import ServerContext from '../../core/ServerContext';

export async function packTheme(themeDoc: IDocument, serverContext: ServerContext) {
	const userDoc: IDocument = await serverContext.db.findById('users', themeDoc.userId);

	return {
		themeId: themeDoc._id.toHexString(),
		user: packUser(userDoc),
		name: themeDoc.name,
		description: themeDoc.description,
		themeFileName: themeDoc.themeFileName,
		imageFileName: themeDoc.imageFileName,
		primaryColor: themeDoc.primaryColor,
		secondaryColor: themeDoc.secondaryColor,
		textColor: themeDoc.textColor
	}
}

export function packUser(userDoc: IDocument) {
	return {
		userId: userDoc._id.toHexString(),
		username: userDoc.username
	};
}

export async function packUserWithThemes(userDoc: IDocument, serverContext: ServerContext) {
	const themeDocs: IDocument[] = await serverContext.db.findArray('themes', {
		userId: userDoc._id,
		state: { $ne: 'deleted' }
	});
	const packedThemePromises = themeDocs.map(themeDoc => packTheme(themeDoc, serverContext));
	const packedThemes = await Promise.all(packedThemePromises);

	return {
		...packUser(userDoc),
		themes: packedThemes
	};
}

export function packEvent(eventDoc: IDocument) {
	return {
		type: eventDoc.type,
		...eventDoc.content
	};
}
