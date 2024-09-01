describe("blur", () => {
  test("blur a secret", () => {
    // Define the document (web page) that we will test against
    document.body.innerHTML = `
    <div id="testDiv">
      "My secret"
    </div>`

    const testDiv = document.getElementById("testDiv") as HTMLInputElement
    expect(testDiv).toBeDefined()
    testDiv.style.filter = "blur(5px)"
    expect(testDiv.style.filter).toBe("blur(5px)")
  })
})
