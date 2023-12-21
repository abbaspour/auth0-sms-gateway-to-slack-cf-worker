async function readRequestBody(request) {
    const {headers} = request
    const contentType = headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
        return await request.json()
    } else if (contentType.includes("application/text")) {
        return request.text()
    } else if (contentType.includes("text/html")) {
        return request.text()
    } else if (contentType.includes("form")) {
        const formData = await request.formData()
        const body = {}
        for (const entry of formData.entries()) {
            body[entry[0]] = entry[1]
        }
        return body;
    } else {
        // Perhaps some other type of data was submitted in the form
        // like an image, or some other binary data.
        return 'a file';
    }
}

async function gatherResponse(response) {
    const {headers} = response;
    const contentType = headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
        return JSON.stringify(await response.json())
    } else if (contentType.includes("application/text")) {
        return response.text()
    } else if (contentType.includes("text/html")) {
        return response.text()
    } else {
        return response.text()
    }
}


async function handleRequest(request) {

    const reqBody = await readRequestBody(request);

    console.log(`reqBody: ${JSON.stringify(reqBody)}`);

    const {recipient, body, sender} = reqBody;

    const init = {
        body: JSON.stringify({
            text: `message from ${sender} for ${recipient}: ${body}`
        }),
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
    };

    console.log(`sending token request to endpoint: ${ENDPOINT} using param of ${JSON.stringify(init)}`);
    const response = await fetch(`${ENDPOINT}`, init);
    const results = await gatherResponse(response);
    console.log(`upstream token result: ${results}`);

    return new Response(null);
}

addEventListener("fetch", event => {
    return event.respondWith(handleRequest(event.request))
})
