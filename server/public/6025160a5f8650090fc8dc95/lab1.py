import tkinter as tk
from tkinter import ttk

def main():

	def onlyDigits(char):
		return char >= "0" and char <= "9"

	def startupRecognition():
		imageAmount = int(imageAmountEntry.get())
		classAmount = int(classAmountEntry.get())
		if not (1000 <= imageAmount <= 100000) or not (2 <= classAmount <= 20):
			return

	root = tk.Tk()
	root.title("k-means")
	root.geometry("700x650+300+100")

	labelImageAmount = tk.Label(root, text='image amount:')
	labelImageAmount.place(x = 10, y = 5)
	imageAmountEntry = ttk.Entry(root)
	imageAmountEntry.config(width = 20, font='Arial 9', validate="key", validatecommand=(root.register(onlyDigits), '%S'))
	imageAmountEntry.place(x = 12, y = 30)

	labelClassAmount = tk.Label(root, text='class amount:')
	labelClassAmount.place(x = 200, y = 5)
	classAmountEntry = ttk.Entry(root)
	classAmountEntry.config(width = 20, font='Arial 9', validate="key", validatecommand=(root.register(onlyDigits), '%S'))
	classAmountEntry.place(x = 202, y = 30)

	canvasMain = tk.Canvas(root, width=root.winfo_screenwidth(), height=root.winfo_screenheight() - 130, bg='white')
	canvasMain.place(x=0, y=75)

	btnProcess = tk.Button(root, text="recognize", command=startupRecognition)
	btnProcess.config(width=12, height=1)
	btnProcess.place(x=400, y=28)
	root.mainloop()
	
if __name__ == "__main__":
	main()
