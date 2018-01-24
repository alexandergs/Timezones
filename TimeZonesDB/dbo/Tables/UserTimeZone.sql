CREATE TABLE [dbo].[UserTimeZone] (
    [UserEmail]    NVARCHAR (100) NOT NULL,
    [TimeZoneName] NVARCHAR (100) NOT NULL,
    [TimeZoneTime] DATETIME2 (7)  NOT NULL,
    [CityName] NVARCHAR(100) NOT NULL DEFAULT '', 
    CONSTRAINT [PK_UserTimeZones] PRIMARY KEY CLUSTERED ([UserEmail] ASC, [TimeZoneName] ASC),
    CONSTRAINT [FK_UserTimeZones_UserTimeZones] FOREIGN KEY ([UserEmail]) REFERENCES [dbo].[User] ([Email])
);


GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE TRIGGER [dbo].[SaveAuditInfo]
   ON  [dbo].[UserTimeZone]
   AFTER DELETE,UPDATE
AS 
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	INSERT INTO [dbo].[UserTimeZoneAudit]
		([UserEmail], [TimeZoneName], [TimeZoneTime], [CityName], ModifiedByUserEmail)
	SELECT [UserEmail],[TimeZoneName],[TimeZoneTime], [CityName], CURRENT_USER
	FROM [DELETED];
    -- Insert statements for trigger here

END
