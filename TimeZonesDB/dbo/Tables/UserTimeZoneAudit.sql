CREATE TABLE [dbo].[UserTimeZoneAudit] (
    [UserEmail]           NVARCHAR (100) NOT NULL,
    [TimeZoneName]        NVARCHAR (100) NOT NULL,
    [TimeZoneTime]        DATETIME2 (7)  NOT NULL,
    [ModifiedByUserEmail] NVARCHAR (100) NOT NULL, 
    [CityName] NVARCHAR(100) NOT NULL
);

