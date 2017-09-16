#DROPBOX LIBRARY
import dropbox

#Global vars
filename = "portfolio.json"
token_file = "../diary/access_token.txt"

class TransferData:
    def __init__(self, access_token):
        self.access_token = access_token

    def upload_file(self, file_from, file_to):
        """upload a file to Dropbox using API v2
        """
        dbx = dropbox.Dropbox(self.access_token)

        with open(file_from, 'rb') as f:
            dbx.files_upload(f.read(), file_to, dropbox.files.WriteMode('overwrite'))

def main():
	print "Uploading data to Dropbox"

	#Upload data to Dropbox
	with open(token_file, 'rb') as f:
		access_token = f.read()
	transferData = TransferData(access_token)
	transferData.upload_file(filename, "/Website/Portfolio/portfolio.json")

	#Upload images to Dropbox
	transferData.upload_file("images/headshot.jpg", "/Website/Portfolio/headshot.jpg")
	transferData.upload_file("images/mail.png", "/Website/Portfolio/mail.png")
	transferData.upload_file("images/degree.png", "/Website/Portfolio/degree.png")
	transferData.upload_file("images/mind_map.png", "/Website/Portfolio/mind_map.png")
	transferData.upload_file("images/journal.png", "/Website/Portfolio/journal.png")
	transferData.upload_file("images/satya.png", "/Website/Portfolio/satya.png")
	transferData.upload_file("images/scheduling.png", "/Website/Portfolio/scheduling.png")

	print "Data uploaded!"

if __name__ == '__main__':
	main()
